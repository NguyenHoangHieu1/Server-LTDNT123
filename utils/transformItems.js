const transformItem = (type, item) => {
  const { id, name, price, ...itemProps } = item.toObject();
  return {
    id: item._id,
    type: type,
    name: item.name,
    price: item.price,
    specs: {
      ...itemProps,
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

module.exports = {
  transformItem,
  transformItems,
};
