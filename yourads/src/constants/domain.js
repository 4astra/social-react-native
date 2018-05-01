/**
 * @author Hoat Ha
 * @desc config domain, endpoint, url
 */

var AppDomain = {
	// base endpoint
	baseURL1: 'https://www.yourads.vn/api/projects',
	baseURL2: 'https://api2.yourtv.vn',
	baseURL3: 'https://www.yourads.vn/api',
	devAPI: 'http://dev.yourads.vn/api',
	proAPI: 'http://yourads.vn/api',

	// endpoint 
	// ??? should place Endpoint API at here

	//get list NewsJob with latitude and longitude of User Location
	listNewsJobFromLocation: '/projects/getByLatLng',

	// do
	bidJobPrice: '/abid',

	// social network
	socialNetworkLogin: '/login-social',

	// top provider
	topProviders: '/provider-representative',

	//Latest Contractor List
	latestContractors: '/latest-contractors',

	//lastest Buyer List
	lastestBuyers: '/latest-buyers',

	// video template
	videosTemplate: '/video-template?',

	// make video
	waitingPublicBidding: '/pending-bidder-projects', ///pending-bidder-projects?uid=404&type=20
	waitingSpecificationBidder: '/pending-bidder-projects',//?uid=404&type=10',
	jointedProject: '/bidder-projects-by-status',//?uid=404&status=2',
	contributedProject: '/bidder-projects-by-status',//?uid=404&status=3',

	// bid project
	bidProject: '/abid',

	// buy video
	buyVideo: '/owner-quotation-projects', //owner-quotation-projects?userid=404&status=3
	closeProject: '/projects/completion',
};

export default AppDomain;
