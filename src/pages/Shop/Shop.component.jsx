import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsPageContainer from './shop.container';
import CollectionsOverviewContainer  from '../../components/collection-overview/collectionOverview.container';

import { selectFetchCollectionsAsync } from '../../redux/shop/shop.actions';


class ShopPage extends React.Component {   
   
   componentDidMount(){
      const { fetchCollectionsAsync } = this.props;
     fetchCollectionsAsync();           
   };

   render(){
      const { match } = this.props;
      
      return (
         <div className='ShopPage'>
           <Route exact path={`${match.path}`} component= {CollectionsOverviewContainer}/>
           <Route path={`${match.path}/:collectionId`} component={CollectionsPageContainer}/>
        </div>
      )};        
   };

 

   const mapDispatchToProps = dispatch =>({
      fetchCollectionsAsync: ()=>dispatch(selectFetchCollectionsAsync())
   });


export default connect(null,mapDispatchToProps)(ShopPage);