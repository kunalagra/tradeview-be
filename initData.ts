import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
const prisma = new PrismaClient();

// Check if the database is empty and load CSV data if necessary
async function checkAndLoadData() {
	try {
		// Check if the database is empty by counting MarketData records
		const marketDataCount = await prisma.marketData.count();

		if (marketDataCount === 0) {
			console.info('Database is empty. Loading data from CSV...');
			await loadCSV();
		} else {
			console.info('Database is not empty. Skipping CSV import.');
		}
	} catch (error) {
		console.error('Error checking or loading data:', error);
	}
}

// Load CSV and insert data into the database
async function loadCSV() {
	const results: any[] = [];

	// Path to your CSV file
	const csvFilePath = path.join(process.cwd(), 'data.csv');

	try {
		await new Promise<void>((resolve, reject) => {
			fs.createReadStream(csvFilePath)
				.pipe(
					csvParser({
						headers: ['id', 'date', 'price', 'instrument_name'],
						skipLines: 1,
					}),
				)
				.on('data', (row) => {
					const parsedRow = {
						date: new Date(row.date),
						price: parseFloat(row.price),
						instrumentName: row.instrument_name,
					};

					// Push parsed data to results array only if valid
					if (
						parsedRow.date instanceof Date &&
						!isNaN(parsedRow.date.getTime()) &&
						!isNaN(parsedRow.price) &&
						parsedRow.instrumentName
					) {
						results.push(parsedRow);
					} else {
						console.log(
							'Invalid data found and skipped:',
							parsedRow,
						);
					}
				})
				.on('end', resolve)
				.on('error', reject);
		});

		console.info('CSV file successfully processed');
		await saveToDatabase(results);
	} catch (error) {
		console.error('Error reading or processing CSV:', error);
	}
}

// Save parsed CSV data to the database
async function saveToDatabase(data: any[]) {
	try {
		// Perform a bulk insert with createMany
		await prisma.marketData.createMany({
			data: data.map((row) => ({
				date: row.date,
				price: row.price,
				instrumentName: row.instrumentName,
			})),
		});
		console.info('Data successfully inserted into the MarketData table.');
	} catch (error) {
		console.error('Error inserting data into the database:', error);
	}
}

await checkAndLoadData();
