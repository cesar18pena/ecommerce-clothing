import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Route } from "react-router-dom";
import { createStructuredSelector } from 'reselect';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match }) => {

  const [loading, setIsLoading] = useState(true);
  const unsubscribeFromSnapshot = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const collectionRef = firestore.collection('collections');

    unsubscribeFromSnapshot.current = collectionRef.onSnapshot(async snapShot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
      dispatch(updateCollections(collectionsMap));
      setIsLoading(false);
     });
    
    return () => {
      console.log("TCL: ShopPage -> cleanup");
    };
  }, [])

  return (
    <div className="shop-page">
      <Route 
        exact 
        path={`${match.path}`} 
        render={(props => 
          <CollectionsOverviewWithSpinner 
            isLoading={loading} {...props} 
          /> 
        )}
      />

      <Route 
        path={`${match.path}/:collectionId`} 
        render={props => (
          <CollectionPageWithSpinner isLoading={loading} {...props} />
        )} 
      />
    </div>
)};

export default ShopPage;
