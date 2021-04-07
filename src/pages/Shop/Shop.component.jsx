import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview';
import SHOP_DATA from './Shop.data';

class ShopPage extends React.Component {
 constructor(){
     super()
     this.state = {
         collections: SHOP_DATA
     };
 }

 render(){
     const { collections } = this.state;
     return (
        <div className='ShopPage'>
            {
            collections.map( ({id, ...othercollections}) => (
                <CollectionPreview key={id} {...othercollections}/>
            ))
            }
            
        </div>
     )
 }
}

export default ShopPage;