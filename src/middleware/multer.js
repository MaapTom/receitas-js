const multer = require('multer');

module.exports = (multer({

  storage: multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null,  'receitas/../public/imagens-db');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }

  }), 

  fileFilter: (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpeg', 'image/jpg'].find( formatoAceito => formatoAceito == file.mimetype);

    if(isAccepted)  {
      // Arquivo válido
      return cb(null, true);
    }
      // Arquivo negado
    return cb(null, false);

  }
}));