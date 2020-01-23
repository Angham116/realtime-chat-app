require('dotenv').config();


let DB_Url = process.env.DB_URL_DEVELOPMENT;


if(process.env.NODE_ENV === 'production') {
  DB_Url = process.env.DB_Url_PRODUCTION;
}

const SECRET = process.env.SECRET;
module.exports = {
  DB_Url,
  SECRET,
};
