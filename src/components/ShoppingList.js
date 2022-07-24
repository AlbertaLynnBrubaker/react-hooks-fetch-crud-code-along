import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then(r => r.json())
      .then(data => {
        setItems(items => data)
      })
      .catch(e => console.error("Error:", e))
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const handleAddItem = (newItem) => {
    setItems(items => [...items, newItem])
  }

  const handleUpdateItem = (updatedItem) => {
    const updatedItems = items.map(item => {
      if(item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    })
    setItems(items => updatedItems)
  }

  const handleDeleteItem = (deletedItem) => {
    const updatedItems = items.filter(item => item.id !== deletedItem.id);
    setItems(items => updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem = {handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => {
          return <Item onDeleteItem={handleDeleteItem} onUpdateItem= {handleUpdateItem} key={item.id} item={item} />
        }
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
