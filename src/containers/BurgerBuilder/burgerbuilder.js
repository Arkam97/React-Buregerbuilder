import React, { Component } from 'react';

import Aux from '../../hoc/Auxilery';
import Burger from '../../component/Burger/burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
// import axios from '../../axios-oder';
// import axios from 'axios';
import Spinner from '../../component/UI/Spinner/Spinner';
// import WithErrorhndler from '../../hoc/withErrorhandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // ingredients: null,
    //         totalPrice: 4,
    //         purchasable: false,
    //         purchasing: false ,
    //         loading : false
    //         // error: false
    //     };
    // }
    state = {
        ingredients: {
            salad : 0,
            bacon : 0,
            meat : 0,
            cheese : 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false ,
        loading : false,
        error: false
    }

    // componentDidMount()
    // {
    //     axios.get('https://react-burgerbuilder-7c1e8.firebaseio.com/ingredients.json')
    //     .then(response => { this.setState({ingredients: response.data});
    //     console.log(response);
    //     })
    //     .catch( error => {
    //         this.setState( { error: true } );
    //     } );

    // }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');

        // this.setState({loading : true});

        // const oder = {
        //     ingredients : this.state.ingredients,
        //     price : this.state.totalPrice,
        //     customer : {
        //         name: 'max',
        //         address: 'colombo 12',
        //     email:'max@gmail.com'
        //     },
        //     deliverymethod : 'fatest'
        // }
        // axios.post('/oders.json',oder)
        // .then(response =>{ 
        //         this.setState({loading : false, purchasing : false}); 
        // })
        // .catch(error =>{
        //     this.setState({loading : false, purchasing : false}); 
        // });
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}

       
        let odersummery = null
        let burger=this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if(this.state.ingredients)
        {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
                </Aux>     
            );
            
            odersummery = <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        }
        

        if(this.state.loading)
        {
            odersummery = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {odersummery}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default BurgerBuilder;