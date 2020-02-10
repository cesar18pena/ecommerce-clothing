import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Route } from "react-router-dom";

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const ShopPage = ({ match }) => {

  let unsubscribeFromSnapshot = null;
  const dispatch = useDispatch();

  useEffect(() => {
    const collectionRef = firestore.collection('collections');

    unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapShot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
      dispatch(updateCollections(collectionsMap));
     });
    
    return () => {
      console.log("TCL: ShopPage -> cleanup");
    };
  }, [])

  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
)};



export default ShopPage;
