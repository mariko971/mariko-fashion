import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsPageContainer from './shop.container';
import CollectionsOverviewContainer  from '../../components/collection-overview/collectionOverview.container';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';


const ShopPage = ({match, fetchCollectionsStart})=> {   
   
   useEffect(()=>{
      fetchCollectionsStart();
   },[fetchCollectionsStart]);     
      
   return (
      <div className='ShopPage'>
         <Route exact path={`${match.path}`} component= {CollectionsOverviewContainer}/>
         <Route path={`${match.path}/:collectionId`} component={CollectionsPageContainer}/>
      </div>
   )        
};

 

   const mapDispatchToProps = dispatch =>({
      fetchCollectionsStart: ()=>dispatch(fetchCollectionsStart())
   });


export default connect(null,mapDispatchToProps)(ShopPage);