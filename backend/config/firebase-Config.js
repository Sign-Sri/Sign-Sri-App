const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccount ={
  
    "type": "service_account",
    "project_id": "sign-sri-123",
    "private_key_id": "ae42f0a14dedb47934c1b8cf26f6cfe58aa6a420",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDE86EKrmSsi/nZ\neC/1EjVT7JFpLjkDdK3EJVPSMRLFwHfAEwPCT/z0i/xuR90gByRMPgOh2LqSHzD5\nwAp/Rqx1JOSs3zz2b3dQmjjOW51ZAUmNxoa4TdAUNI30tpNlDwrCyBidVD+Wssan\nwjYc9NZTkHIyMH1+yvhPPSdwHNAZhdfIzsObhq4aCDOAHsI3K9fQPVe3depvj5YC\nRSj7kRBh/MbJIv/JRUcEocvqbsco+bAtIrqVlU5/WzfvQteAeOuAxN/amgBg7HYt\nniILuJns6C12d/IzHwYOUWh2YxSn5oxMzDpZ+uR1RKtz4wFEIwHX91segDxr1+36\nuexZCsHpAgMBAAECggEACS5DP3QMbMbc8UvQVV4jFekibBuubeeIMIeosKo3uTCt\n4MpiHmtLxpeazZSNOCl7SSyKpHg75Ghj68ap+iiF1AjDZMWNqFNfEC4S3+0BPC8s\nWC7noKXaJNfcwQo5Ceqn3QkYO06RrAlHeeesTb7pGZ3FKzJQ5mCqvUgub9XVVUa2\nqzs6g097ZZGOCuN4lPPtjYUm3pmlUi2emS8vnyjL7l8lxaEZYRGNjHoF4aq+WtIq\nfMS3hjWm8YioO/C11jALNDXiVYPuD4b3FnZdHhpI4MNuGqcRxVCbz0/PRkPLd89X\nABYB3aVtw/v3ux5A8dgAljSxKVohCRcp20Lkf55NkwKBgQD9SN1t2cUzauEeLORB\nSE4+RDyegfgYaCp1zBxyMdMJUbTty03E4ggTv2wGECRyjLLKq16m5mtpkNnG7DiU\nSs620wJbZlHKUTwjPhJZaIdHMfXZSJytX+mYywDLfyMjnToHH0Sr6t4XYoUbJ2oW\nY7Xl7oAE2WzCzFSym4wztYwWTwKBgQDHECjLOHdYwDbiTRnNKK5g+lbOzZ8yjmsL\nBIRjJZGwyJRoqz8LMHAq/FwbzzkeDVtSen2s70mRDWVFoO46MiQxaG2BMcsw+Mbp\negSXYEOwzdmWNcsk3/hcGtlKbDG2qs5J0BH3vfTMnqA1qdIRuk6UX6U1jodz0pXM\nOVPLlLPORwKBgG7sIzUBgvBSpUYOyOOiI8n3HkkYiCtAKyAthGOqWE6jfsYJHATW\nLE1hrpA1L5EO9xn01N3o2S+BJS6NsvWWkVLVtBmNBNLCosCYZXbMZToTsiQ3PY5c\nC7RDaxSzmBL3vzrxQaS8lgjNt5c9uqMVhcqtmVkGUzA4Rft2TX8zyabXAoGAdTwy\nGkVeHHnPmQW5bVdJI7orx83XtUmlBy8Y3N9yZ0AqD17TWT6kwNwxTvuC8w0AvJmB\nTIj8tZ3DB/fYdZO0Nxj+bPkrZuMNGtIOxCwgkY8aV1nFEymIto3lbOw9dwwvQ89z\n1YkdFClTx2cFXgVwY/fUb69KXM8oA8e7bwlbv98CgYEAs1zHMsF6UsKTY4MlgBzB\nQdSsBEo9zyHe5fqgl8166n/WaDqxAZB4YW/gLdqtuuLcqxY6p8gM0YS724LA6J8f\noIdyK2ruW/1uqISPgMYZEaU75UIu/e0tyFB27ljnjX6TbYNV96jVsFib9gX41sB6\nxVB9op4s+D1Lp7qmGAmEqg4=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@sign-sri-123.iam.gserviceaccount.com",
    "client_id": "104787366623937702557",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40sign-sri-123.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

//
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;