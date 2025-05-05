const transformItem = (type, item) => {
  return {
    id: item._id,
    type: type,
    name: item.name,
    price: item.price,
    specs: {
      ...item.toObject(),
    },
  };
};

const transformItems = (type, items) => {
  const convertedItems = [];
  for (const item of items) {
    convertedItems.push(transformItem(type, item));
  }
  return convertedItems;
};

export { transformItem, transformItems };
