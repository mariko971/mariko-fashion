import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

const CollectionsOverview = ({collections})=>{
 
     return (
        <div className='collections-overview'>
            { collections.map( ({id, ...othercollections}) => (
                <CollectionPreview key={id} {...othercollections}/>
            ))}            
        </div>
     )
}

const mapStateToProps = createStructuredSelector({
collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);