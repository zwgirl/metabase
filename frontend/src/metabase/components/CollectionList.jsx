import React from "react";
import { t } from "ttag";
import { Box } from "grid-styled";
import { connect } from "react-redux";

import * as Urls from "metabase/lib/urls";

import Icon from "metabase/components/Icon";
import Link from "metabase/components/Link";

import CollectionDropTarget from "metabase/containers/dnd/CollectionDropTarget";
import ItemDragSource from "metabase/containers/dnd/ItemDragSource";

import { PERSONAL_COLLECTIONS } from "metabase/entities/collections";

import { PillWithAdornment } from "metabase/components/Pill";

const CollectionLink = ({ collection, isSelected, iconName }) => (
  <Box className="CollectionLink" mb={1}>
    <Link to={`collection/${collection.id}`}>
      <PillWithAdornment
        active={isSelected}
        left={<Icon name={iconName} />}
        right={collection.hasChildren && <Icon name="chevrondown" size={12} />}
      >
        {collection.name}
      </PillWithAdornment>
    </Link>
  </Box>
);

@connect(
  ({ currentUser }) => ({ currentUser }),
  null,
)
class CollectionList extends React.Component {
  render() {
    const {
      analyticsContext,
      collections,
      currentUser,
      currentCollection,
      asCards,
    } = this.props;

    const shouldShowPersonal = currentCollection.effective_ancestors === 0;
    console.log("currentCollection", currentCollection);
    console.log("collections[0]", collections[0]);
    return (
      <Box className="relative">
        {collections
          .filter(c => c.id !== currentUser.personal_collection_id)
          .map(collection => (
            <Box>
              <CollectionDropTarget collection={collection}>
                {({ highlighted, hovered }) => (
                  <ItemDragSource
                    item={collection}
                    collection={currentCollection}
                  >
                    <CollectionLink
                      collection={collection}
                      highlighted={highlighted}
                      hovered={hovered}
                      iconName="folder"
                      event={`${analyticsContext};Collection List;Collection click`}
                      isSelected={collection.id === currentCollection.id}
                    />
                  </ItemDragSource>
                )}
              </CollectionDropTarget>
              {collection.children && (
                <div className="pl2">
                  <CollectionList
                    {...this.props}
                    collections={collection.children}
                  />
                </div>
              )}
            </Box>
          ))}
        {shouldShowPersonal && (
          <Box mt={2}>
            <Box className="relative">
              <CollectionDropTarget
                collection={{ id: currentUser.personal_collection_id }}
              >
                {({ highlighted, hovered }) => (
                  <CollectionLink
                    collection={{
                      name: t`My personal collection`,
                      id: currentUser.personal_collection_id,
                    }}
                    iconName="folder"
                    highlighted={highlighted}
                    hovered={hovered}
                    event={`${analyticsContext};Collection List;Personal collection click`}
                    asCard={asCards}
                  />
                )}
              </CollectionDropTarget>
            </Box>
            <Box>
              {currentUser.is_superuser && (
                <CollectionLink
                  collection={{
                    name: PERSONAL_COLLECTIONS.name,
                    // Bit of a hack. The route /collection/users lists
                    // user collections but is not itself a colllection,
                    // but using the fake id users here works
                    id: "users",
                  }}
                  iconName="person"
                  event={`${analyticsContext};Collection List;All user collections click`}
                  asCard={asCards}
                />
              )}
              <Link
                to={Urls.newCollection(currentCollection.id)}
                data-metabase-event={`${analyticsContext};Collection List; New Collection Click`}
              >
                <Icon name="add" mr={1} bordered />
                <h4>{t`New collection`}</h4>
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    );
  }
}

CollectionList.defaultProps = {
  w: [1, 1 / 2, 1 / 4],
  asCards: false,
};

export default CollectionList;
