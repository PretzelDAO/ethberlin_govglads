const composeClassName = (...items: (string | false)[]) => {
  return items.filter(Boolean).join(" ");
};

export default composeClassName;