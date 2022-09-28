// This is just more concise than
// using the two-line option
require('dotenv').config();
import { ExtendedClient } from './structures/Client';

export const client = new ExtendedClient();
client.start();