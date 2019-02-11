import React from 'react';
import PropTypes from 'prop-types';
import DotDotDot from 'react-dotdotdot';
import NameSpacedImg from '../../UI/NameSpacedImg/NameSpacedImg';
import styles from './Card.module.css';
import Card from '../../../hoc/Card';
import Link from '../../UI/Link/Link';
import { ARIA_LABEL_RESOURCE } from '../../../constants/ariaLabels';
import { CARD_CONFIG } from '../../../constants/ui';

const DefaultCard = ({ title, description, resourcePath, image, resourceType, author }) => (
  <Card resourceType={resourceType} resourcePath={resourcePath} title={title} author={author}>
    <div className={styles.Body}>
      <DotDotDot clamp={CARD_CONFIG.maxDescriptionLines} className={styles.BodyDescription}>
        <p>{description}</p>
      </DotDotDot>
      <div className={styles.BodyImage}>
        {image && image !== '' ? (
          <Link to={resourcePath} aria-label={ARIA_LABEL_RESOURCE}>
            <NameSpacedImg src={image || ''} unstyled />
          </Link>
        ) : null}
      </div>
    </div>
  </Card>
);

DefaultCard.displayName = 'Default Card Component';

DefaultCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  resourcePath: PropTypes.string.isRequired,
  resourceType: PropTypes.string,
  image: PropTypes.string,
  author: PropTypes.string,
};

// resource type defaults to blank, because any graph ql nodes that have no resource type
// default to rendering this component
DefaultCard.defaultProps = {
  image: '',
  resourceType: '',
  author: '',
};

export default DefaultCard;
