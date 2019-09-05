import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom"
// import logo from './logo.svg';
import './App.css';
import Home from './containers/Home';
import Create from './containers/Create';
import { testItems, testCategories } from './testData';
import { flatternArr, ID, parseToYearAndMonth } from './utility';

export const AppContext = React.createContext()
class App extends React.Component {
  constructor(props) {
    super(props); 
      this.state = {
        items: flatternArr(testItems),
        categories: flatternArr(testCategories)
      }
      this.actions = {
        deleteItem: (item, index) => {
          console.log(this.state.items)
          delete this.state.items[item.id]
          this.setState({
            items: this.state.items
          })
        },
        createItem: (data, categoryId) => {
          const newId = ID()
          const parsedDate = parseToYearAndMonth(data.date)
          data.monthCategory = `${parsedDate.year}=${parsedDate.month}`
          data.timestamp = new Date(data.date).getTime()
          const newItem = {...data, id: newId, cid: categoryId}
          this.setState({
            items: {...this.state.items, [newId]: newItem}
          })
          console.log(this.state.items)
        },
        updateItem: (item, updatedCategoryId) => {
          const modifedItem = {
            ...item, 
            cid: updatedCategoryId,
            timestamp: new Date(item.date).getTime()
          }
          console.log(modifedItem)
          console.log(this.state.items)
          this.setState({
            items: {...this.state.items, [modifedItem.id]: modifedItem}
          })
        }
      }
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
      <BrowserRouter>
        <div className="App">
          <div classname="container pb-5">
            <Route path="/" exact component={Home} />
            <Route path="/create" exact component={Create} />
            <Route path="/edit/:id" exact component={Create} />
          </div>
        </div>
      </BrowserRouter>
      </AppContext.Provider>
      
    );
  }
 
}

export default App;

{/* <header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<h1 className="App-title">Welcome to React</h1>
</header>
<ViewTab 
 activeTab={LIST_VIEW}
 onTabChange={(view)=>{console.log(view)}}
/>
<PriceList 
 items={items}
 onModifyItem={(item)=>{alert(item.id)}}
 onDeleteItem={(item)=>{alert(item.id)}}
/>
<MonthPicker
 year={2018}
 month={5}
/> */}
