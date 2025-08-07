import { FaUser, FaUsers, FaCube, FaChartLine} from 'react-icons/fa';


const AdminDashboard = ({ analytics }) => (
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
                        {/* Blog analytics removed */}
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
        {/* agy kam hona hai */}
    </div>
);

export default AdminDashboard;
