import React from 'react';
import logo from '../logo.svg';

import PriceList from '../components/PriceList';
import ViewTab from '../components/ViewTab';
import MonthPicker from '../components/MonthPicker';
import {
  LIST_VIEW, 
  CHART_VIEW, 
  TYPE_INCOME, 
  TYPE_OUTCOME, 
  parseToYearAndMonth,
  padLeft
} from '../utility';
import CreateBtn from '../components/CreateBtn';
import TotalPrice from '../components/TotalPrice';
import { Tabs, Tab } from '../components/Tabs';
import Ionicon from 'react-ionicons';
import { AppContext } from '../App'
import  withContext  from '../WithContext'
import { withRouter } from 'react-router-dom'


// export const categories = {
//   "1": {
//     "id": "1",
//     "name": "旅行",
//     "type": "outcome",
//     "iconName": "ios-plane"
//   },
//   "2": {
//       "id": "2",
//       "name": "理财",
//       "type": "income",
//       "iconName": "logo-yen"
//   }
// }

// const items = [
//   {
//   "id": 1,
//   "title": "去云南旅游",
//   "price": 200,
//   "date": "2018-09-10",
//   "cid": 1
// },
// {
//   "id": 2,
//   "title": "去云南旅游",
//   "price": 400,
//   "date": "2018-09-10",
//   "cid": 1
// },
// {
//   "id": 3,
//   "title": "理财收入",
//   "price": 200,
//   "date": "2019-08-10",
//   "cid": 2
// }

// ]

// const newItem = {
//   "id": 4,
//   "title": "新添加的项目",
//   "price": 300,
//   "date": "2018-10-10",
//   "cid": 1
// }
const tabsText = [LIST_VIEW, CHART_VIEW]

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // items,
      currentDate: parseToYearAndMonth(),
      tabView: tabsText[0]
    }
  }

  changeView = (index) => {
    this.setState({
      tabView: tabsText[index]
    })
  }

  changeDate = (year, month)=> {
    this.setState({
      currentDate : {year, month}
    })
  }

  modifyItem = (item) => {
    // const modifedItems = this.state.items.map(item=> {
    //   if(item.id === modifiedItem.id) {
    //     return {...item, title: '更新后的标题'}
    //   }else{
    //     return item
    //   }
    // })
    // this.setState({
    //   items: modifedItems
    // })
    this.props.history.push(`/edit/${item.id}`)
  }

  createItem = () => {
    // this.setState({
    //   items: [newItem, ...this.state.items]
    // })
    this.props.history.push('/create')
  }

  deleteItem = (item)=> {
    // const filteredItems = this.state.items.filter(item => item.id !== deletedItem.id)
    // this.setState({
    //   items: filteredItems
    // })
    this.props.actions.deleteItem(item)
  }
  render() {
    const { data } = this.props
    const {items, categories} = data
    const {tabView, currentDate} = this.state
    // const itemsWithCategory = items.map(item => {
    //   item.category = categories[item.cid]
    //   return item
    // }).filter(item => {
    //   return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    // })
    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid]
      return items[id]
    })
    .filter(item => {
      return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    })

    let totalIncome = 0
    let totalOutcome = 0

    itemsWithCategory.forEach(item => {
      if(item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price
      }else {
        totalIncome += item.price
      }
    })
    return(
      <React.Fragment>
        <header className="App-header">
          {/* <div className="row mb-5">
            <img src={logo} className="App-logo" alt="logo" />
          </div> */}
          <div className="row" style={{paddingTop: '20px'}}>
            <div className="col">
              <MonthPicker 
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
            <div className="col">
              <TotalPrice 
                income={totalIncome}
                outcome={totalOutcome}
              />
            </div>
          </div>
        </header>
        <div className="content-area py-3 px-3">
          <Tabs activeIndex={0} onTabChange={this.changeView}>
            <Tab>
                <Ionicon 
                  className="rounded-circle mr-2"
                  fontSize="25px"
                  color='#007bff'
                  icon="ios-paper"
                />
                List
            </Tab>
            <Tab>
                <Ionicon 
                  className="rounded-circle mr-2"
                  fontSize="25px"
                  color={'#007bff'}
                  icon="ios-pie"
                />
          Chart
            </Tab>
          </Tabs>
          {/* <ViewTab 
            activeTab={tabView}
            onTabChange={this.changeView}
          /> */}
          <CreateBtn 
            onClick={this.createItem}
          />
          {
            tabView === LIST_VIEW &&
            <PriceList 
            items={itemsWithCategory}
            onModifyItem={this.modifyItem}
            onDeleteItem={this.deleteItem}
            />
          }
          {
            tabView === CHART_VIEW &&
            <h1>Chart</h1>
          }
          
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withContext(Home));