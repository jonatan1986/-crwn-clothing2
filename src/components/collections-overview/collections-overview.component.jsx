import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectCollections from "../../redux/shop/shop.selectors";
import './collections-overview.styles.scss';
import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectCollectionForPreview } from "../../redux/shop/shop.selectors";

const CollectionsOverview = ({collections}) =>(
    <div className="collections-overview">
        {
            collections.map(({id,...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections:selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);