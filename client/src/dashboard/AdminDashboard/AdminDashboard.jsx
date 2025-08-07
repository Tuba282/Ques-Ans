import { FaUser, FaUsers, FaCube, FaChartLine} from 'react-icons/fa';


const AdminDashboard = ({ analytics, recentBlogs }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100">
                        <FaUsers className="text-blue-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100">
                        <FaUser className="text-green-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-gray-600">Verified Users</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.verifiedUsers}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100">
                        <FaCube className="text-purple-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Work</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.totalBlogs}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100">
                        <FaChartLine className="text-yellow-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-gray-600">Growth</p>
                        <p className="text-2xl font-bold text-gray-900">+{analytics.growth}%</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Blocks</h2>
            <div className="overflow-x-auto">
                <div className="flex flex-wrap justify-content-center items-center gap-6">
                    {recentBlogs.map(blog => (
                        <div key={blog.id} className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-[560px]">
                            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                                <img src={blog.image} alt={blog.title} />
                            </div>
                            <div className="p-4">
                                <h6 className="mb-2 text-slate-800 text-xl font-semibold">Website Review Check</h6>
                                <p className="text-slate-600 leading-normal font-light">The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.</p>
                            </div>
                            <div className="px-4 pb-4 pt-0 mt-2">
                                <button className="rounded-md bg-indigo-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">Read more</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default AdminDashboard;
