import Joi from '@hapi/joi';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import translate from '~/common/services/i18n';
import {
  imagesValidation,
  documentsValidation,
} from '~/common/helpers/validate';
import InputField from '~/client/components/InputField';
import InputUploadField from '~/client/components/InputUploadField';
import InputTextareaField from '~/client/components/InputTextareaField';

const FormFestivals = () => {
  const schema = {
    title: Joi.string().max(128).required(),
    description: Joi.string().required(),
    images: imagesValidation.max(10),
    documents: documentsValidation.max(1),
  };

  return (
    <Fragment>
      <InputField
        label={translate('FormFestivals.fieldTitle')}
        name="title"
        type="text"
        validate={schema.title}
      />

      <InputTextareaField
        label={translate('FormFestivals.fieldDescription')}
        name="description"
        validate={schema.description}
      />

      <InputUploadField
        isImageUpload
        isMultipleFilesAllowed
        label={translate('FormFestivals.fieldImages')}
        name="images"
        validate={schema.images}
      />

      <InputUploadField
        isImageUpload={false}
        label={translate('FormFestivals.fieldDocuments')}
        maxFileCount={1}
        name="documents"
        validate={schema.documents}
      />
    </Fragment>
  );
};

FormFestivals.propTypes = {
  isPasswordHidden: PropTypes.bool,
};

export default FormFestivals;
