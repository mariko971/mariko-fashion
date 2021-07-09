import React from 'react';
import { Route } from 'react-router-dom';
import { firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import { connect } from 'react-redux';


import CollectionsOverview from '../../components/collection-overview/collectionOverview.component';
import CollectionPage from '../collection/collection.component';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
   state = {
      loading: true
   }
   
   unsubscribeSnapshot = null;
   componentDidMount(){
      const { updateCollections } = this.props;
     
      const collectionRef = firestore.collection('collections');
       collectionRef.get().then(async snapshot=>{
         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
         updateCollections(collectionsMap);
         this.setState({loading: false});
      });      
   };

   componentWillUnmount(){
      this.unsubscribeSnapshot();
   }

   render(){
      const { match } = this.props;
      const { loading } = this.state;
      return (
         <div className='ShopPage'>
           <Route exact path={`${match.path}`} render = {(props)=><CollectionOverviewWithSpinner isLoading={loading} {...props}/>}/>
           <Route path={`${match.path}/:collectionId`} render = {(props)=><CollectionsPageWithSpinner isLoading={loading} {...props}/>}/>
        </div>
      )
   } 
        
   };


     const mapDispatchToProps = dispatch =>({
      updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
     });


export default connect(null,mapDispatchToProps)(ShopPage);