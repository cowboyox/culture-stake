import { Joi, Segments } from 'celebrate';

import {
  documentsValidation,
  imagesValidation,
  stickerValidation,
  web3Validators,
} from '~/common/helpers/validate';
import { slugValidation, paginationValidation } from '~/server/validations';

const defaultValidation = {
  artworks: Joi.array().required().max(30),
  description: Joi.string().required(),
  documents: documentsValidation.max(1),
  images: imagesValidation.max(10),
  sticker: stickerValidation.required(),
  subtitle: Joi.string().max(255).required(),
  title: Joi.string().max(128).required(),
};

export default {
  getQuestions: {
    [Segments.PARAMS]: {
      idOrChainId: Joi.alternatives().try(
        Joi.number().integer().positive().required(),
        Joi.string().required(),
        web3Validators.web3().sha3().required(),
      ),
    },
  },
  create: {
    [Segments.BODY]: {
      ...defaultValidation,
    },
  },
  readAll: {
    [Segments.PARAMS]: {
      ...paginationValidation,
      orderKey: Joi.string().valid('id', 'createdAt', 'updatedAt', 'title'),
      query: Joi.string(),
    },
  },
  read: {
    [Segments.PARAMS]: {
      ...slugValidation,
    },
  },
  update: {
    [Segments.PARAMS]: {
      ...slugValidation,
    },
    [Segments.BODY]: {
      ...defaultValidation,
    },
  },
  destroy: {
    [Segments.PARAMS]: {
      ...slugValidation,
    },
  },
};
