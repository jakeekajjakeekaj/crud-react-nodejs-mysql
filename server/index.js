// Si no tuviéramos el "type": "module" decladaro en nuestro package.json, la de abajo sería la manera correcta de mandar a llamar a express, pero al modificiarlo ya podemos importarlo de manera convencional
// const express = require('express');

import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}...`));