from flask import Flask, request

# %%
import ast
import pandas as pd
from sqlalchemy import create_engine
import json

engine_govglads = create_engine(DATABASE_URL)


# %%
voter_vp = pd.read_sql('select * from arbitrum_vp', engine_govglads)

# %%
voter_vp.set_index('voter', inplace=True)
# voter_vp.reset_index(inplace=True)

# %%


# %%
sum_vp = voter_vp['vp'].sum()
sum_vp

# %%
import pandas as pd

# %%
arb_sim = pd.read_sql('select * from arbitrum_similarities', engine_govglads)

import numpy as np

# %%
def computeWeight(vote, vp, maxvp):
    return float(vote * (np.log(float(vp)) / maxvp))



app = Flask(__name__)


@app.route('/', methods= ['POST'])
def hello():
    data = request.get_json()
    print("GOT",data)    
    delegates = data['delegates']
    type = 'weighted_score'
    try:
        type = 'similarity_ratio' if data['type'] == 'similarity' else 'weighted_score'
    except:
        pass
    print("USING TYPE",type)
    set_influencers_for = []
    set_influencers_against = []

    for d in delegates:
        if d['probability']>0:
            set_influencers_for.append((d['wallet'],d['probability']))
        else:
            set_influencers_against.append((d['wallet'],d['probability']))
    print("set_influencers_for",set_influencers_for)
    used_vp = 0
    nd = arb_sim
    for x in set_influencers_for + set_influencers_against:
        v = x[0]
        try:
            used_vp += np.log(voter_vp.loc[v])
            print("power:",v,voter_vp.loc[v])
        except:
            print("no vp:",v)
            pass
    print("used_vp:",used_vp)
    influences  = []
    for x in set_influencers_for:
        sims = nd[nd['voter'] == x[0]]
        #foreach row in sim_votes_v
        for index, row in sims.iterrows():
            #get the voter of the row
            voter = row['co-voter']
            #get the similarity ratio of the row
            sim = row['similarity_ratio']
            #get the overall similarity ratio of the row
            overall = row['total_votes']
            influences.append({'voter':voter,'similarity_ratio':x[1] * sim/len(set_influencers_for),'overall':overall, 'weighted_score':computeWeight(x[1],voter_vp.loc[x[0]],used_vp)})
    for x in set_influencers_against:
        sims = nd[nd['voter'] == x[0]]
        #foreach row in sim_votes_v
        for index, row in sims.iterrows():
            #get the voter of the row
            voter = row['co-voter']
            #get the similarity ratio of the row
            sim = row['similarity_ratio']
            #get the overall similarity ratio of the row
            overall = row['total_votes']
            influences.append({'voter':voter,'similarity_ratio':x[1] * sim/len(set_influencers_against),'overall':overall, 'weighted_score':computeWeight(x[1],voter_vp.loc[x[0]],used_vp)})

    influenced = pd.DataFrame(influences)
    influenced = influenced.groupby('voter').agg({'similarity_ratio':'sum','overall':'sum','weighted_score':'sum'}).reset_index()
    for_influenced = pd.merge( influenced[influenced[type]>0],voter_vp, left_on='voter', right_on='voter')
    against_influenced =  pd.merge( influenced[influenced[type]<0],voter_vp, left_on='voter', right_on='voter')
    for_influenced['weighted_vp'] = for_influenced['vp'] * for_influenced[type]
    against_influenced['weighted_vp'] = against_influenced['vp'] * against_influenced[type].abs()
    print("for_influenced",)
    print("against_influenced",against_influenced['vp'].sum())
    print("score",for_influenced['weighted_vp'].sum(),against_influenced['weighted_vp'].sum())
    

    return json.dumps({'vp_for':for_influenced['vp'].sum(),'vp_against':against_influenced['vp'].sum(), 'score':for_influenced['weighted_vp'].sum()/(for_influenced['weighted_vp'].sum()+against_influenced['weighted_vp'].sum()),'delegates':influenced.to_json(orient='records')})