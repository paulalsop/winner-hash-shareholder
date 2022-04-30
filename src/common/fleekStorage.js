// import fleekStorage from '@fleekhq/fleek-storage-js'
import { upload } from '@fleekhq/fleek-storage-js';

const options = {
    apiKey: `IhvYqhQdSGZ+Y+wH24dkgA==`,
    apiSecret: `eukVkceb/zGo4b14b+f4WAEGQ9QOUZNQuP9xafhZbEs=`,
};
function getNewTimetamps() {
	return Math.floor(new Date().valueOf() / 1000)
}

async function uploadFile(option) {
	const uploadedFile = await upload({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		bucket: getUploadBucket(option.bucket),
		key: option.fileKey,
		ContentType: option.fileType,
		data: option.fileData,
	});
	return uploadedFile;
}
function getBucketUrl(bucket) {
	return `https://storageapi2.fleek.co/${BaseBucket}/${bucket}/`;
}
function getUploadBucket(bucket) {
	return `${BaseBucket}/${bucket}/`;
}

const BaseVersion = 'winner-hash-shareholder/version-1';
const BaseBucket = `b74b8e76-06b7-452f-b530-42841794a1c0-bucket/${BaseVersion}`;

// 用户认证时间
const bucketAllowanceTest = `AllowanceTimeTest`;
const bucketAllowance = `AllowanceTime`;
const BaseBucketAllowance =
	process.env.NODE_ENV == 'development' ? bucketAllowanceTest : bucketAllowance;
export function getAllowanceFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketAllowance);
	return BaseUrl + userAddress + '.json'; // userAddress.toLocaleLowerCase()
}
export async function uploadUserAllowance(userAddress) {
	let option = {
		bucket: BaseBucketAllowance,
		fileKey: userAddress + '.json',
		fileType: 'json',
		fileData: JSON.stringify({
			time: getNewTimetamps()
		}),
	};
	const res = await uploadFile(option);
	console.log(res);
	return res;
}
