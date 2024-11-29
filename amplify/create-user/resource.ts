import {defineFunction} from '@aws-amplify/backend';
const createUser = defineFunction({
	name: "create-user",
	entry: "./handler.ts"
});

export default createUser