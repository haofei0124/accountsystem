import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
import { Colors } from '../utility'

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoryId: props.selectedCategory && props.selectedCategory.id
    }
  }
  selectCategory = (event, category) => {
    this.setState({
      selectedCategoryId: category.id
    })
    this.props.onSelectCategory(category)
    event.preventDefault()
  }
  render() {
    const { categories } = this.props
    const {selectedCategoryId} = this.state
    // const {selectedCategoryId} = this.state
    return(
      <div className="category-select-compnent">
        <div className="row">
          {
            categories.map((category, index)=> {
              const iconColor = (category.id === selectedCategoryId) ? Colors.white : Colors.gray
              const backColor = (category.id === selectedCategoryId) ? Colors.blue : Colors.lightGray
              const activeClassName = (selectedCategoryId === category.id)
              ? 'category-item col-3 active' : 'category-item col-3'
              return(
                <div div className={activeClassName} key={index} role="button" style={{ textAlign: 'center'}}
                onClick={(event) => {this.selectCategory(event, category)}}>
                  <Ionicon
                    className="rounded-circle"
                    style={{backgroundColor: backColor, padding: '5px'}}
                    fontSize="50px"
                    color="#555"
                    icon={category.iconName}
                  >                   
                  </Ionicon>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default CategorySelect;