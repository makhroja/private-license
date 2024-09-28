const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Daftar lisensi yang valid berdasarkan jenis
const validLicenses = {
  'pdf-combine': [
    '$2a$17$Hi.R/hrbrk.QGWZTqsBskOiPGNN8/bhW25Q5kM0py2gviOSbnZqhW',
    // Tambahkan lisensi valid untuk pdf-combine
  ],
  'satu-sehat': [
    '$2a$17$Hi.R/hrbrk.QGWZTqsBskOiPGNN8/bhW25qweH0py2gviOSbnZqhW',
    // Tambahkan lisensi valid untuk satu-sehat
  ],
  'mesin-apm': [
    '$2a$17$Hi.R/hrbrk.QGWZTqsBskOiPGNN8/bhW25qweH0py2gviBNosZqhW',
    // Tambahkan lisensi valid untuk satu-sehat
  ]
};

app.get('/api/validate', (req, res) => {
  const { type, license } = req.query;

  // Buat respons berdasarkan nilai parameter
  let response = {};
  if (validLicenses[type] && validLicenses[type].includes(license)) {
    response = {
      status: 'success',
      status_code: 200, // OK
      message: `Lisensi untuk ${type} valid.`
    };
  } else {
    response = {
      status: 'error',
      status_code: 401, // Unauthorized
      message: `Lisensi tidak valid atau tidak terdaftar untuk jenis ${type}.`
    };
  }

  // Mengirim respons dalam format JSON
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
