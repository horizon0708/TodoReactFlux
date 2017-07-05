import React, { Component } from 'react';

export default class IngredientUI extends React.Component {
    render() {
        const ingredient = this.props.ingredient
        return (
            <div className="col-sm-8 offset-sm-2 ingredient">
                {ingredient}
            </div>
        );
    }
}