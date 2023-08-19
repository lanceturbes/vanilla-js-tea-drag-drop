export function swapItems(itemList, indexA, indexB) {
  const items = itemList.slice();
  const itemB = items[indexB];
  items[indexB] = items[indexA];
  items[indexA] = itemB;
  return items;
}

export default swapItems;
