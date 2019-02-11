import React from 'react';
import PropTypes from 'prop-types';
import DotDotDot from 'react-dotdotdot';
import NameSpacedImg from '../../UI/NameSpacedImg/NameSpacedImg';
import styles from './Card.module.css';
import Card from '../../../hoc/Card';
import Link from '../../UI/Link/Link';
import ActionsRibbon from './ActionsRibbon';
import { ARIA_LABEL_RESOURCE } from '../../../constants/ariaLabels';
import { CARD_CONFIG } from '../../../constants/ui';

const DocumentCard = ({
  title,
  description,
  resourcePath,
  image,
  resourceType,
  author,
  repository,
  owner,
}) => (
  <Card resourceType={resourceType} title={title} resourcePath={resourcePath} author={author}>
    <div className={styles.Body}>
      <DotDotDot clamp={CARD_CONFIG.maxDescriptionLines} className={styles.BodyDescription}>
        <p>{description}</p>
      </DotDotDot>
      <div className={styles.BodyImage}>
        {image && image !== '' ? (
          <Link to={resourcePath} aria-label={ARIA_LABEL_RESOURCE}>
            <NameSpacedImg src={image || ''} unstyled="true" />
          </Link>
        ) : null}
      </div>
    </div>
    <ActionsRibbon
      actions={CARD_CONFIG.actionsRibbon[resourceType]}
      repository={repository}
      owner={owner}
    />
  </Card>
);

DocumentCard.displayName = 'Document Card Component';

DocumentCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  resourcePath: PropTypes.string.isRequired,
  resourceType: PropTypes.string.isRequired,
  repository: PropTypes.string,
  owner: PropTypes.string.isRequired,
  image: PropTypes.string,
  author: PropTypes.string,
};

DocumentCard.defaultProps = {
  image: '',
  author: '',
  repository: null,
};

export default DocumentCard;
