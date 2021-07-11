import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from '../../pages/collection/collection.component';
import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionLoaded(state)
});

const CollectionsPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
    )(CollectionPage);

export default CollectionsPageContainer;