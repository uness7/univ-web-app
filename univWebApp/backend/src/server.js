require('dotenv').config();
import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import signupRoutes from './routes/signupRoutes'
import {connectDB} from './config/db';
import {protect} from './middlewares/authMiddleware';
import homeRoutes from './routes/homeRoutes';
import adminRoutes from './routes/adminRoutes';
//import userRole from './middlewares/userRole'

connectDB();
export const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended : true}));
app.use(morgan('dev'));

app.use('/api', signupRoutes);
app.use('/api/home', protect, homeRoutes);
app.use('/api/admin', protect, adminRoutes);

export const start = () => {
	app.listen(3000, () => {
		console.log('server is running on 3000');
	});
}
