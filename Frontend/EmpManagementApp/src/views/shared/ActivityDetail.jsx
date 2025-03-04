import React, { useState, useEffect } from 'react';
import { BsLightningChargeFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";
import football from './../../assets/football.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import toast from 'react-hot-toast';
import { getActivityById, sendActivityApprovalRequest } from '../../api/activity';
import { useAuthContext } from '../../contexts/AuthProvider';
import LoadingScreen from '../../components/Loading';
import ErrorPage from '../../components/Error';
import { formatDate } from '../../utils/formatDate';
import { fetchImage } from '../../utils/imageUtils';
import ImageCarousel from '../../components/ImageCarousel';

const ActivityDetail = () => {

  const location = useLocation();

  const [role] = useState(location.state.role);
  const [id] = useState(location.state.id);
  const [registerForm, setRegisterForm] = useState(false);
  const [activityDetail, setActivityDetail] = useState(null);
  // const [departments, setDepartments] = useState([
  //   {
  //     id: 1,
  //     name: "Phòng IT"
  //   },
  //   {
  //     id: 2,
  //     name: "Phòng Nhân sự"
  //   }
  // ])

  // const sampleActivityDetail = {
  //   id: 1,
  //   title: "Giải đấu Bóng đá Mini Nội Bộ Công Ty - Mùa Thu 2024",
  //   description: `Giải đấu bóng đá mini nội bộ sẽ là sân chơi thể thao sôi động dành cho tất cả các nhân viên trong công ty. Đây là cơ hội tuyệt vời để các thành viên thể hiện tinh thần đồng đội, rèn luyện sức khỏe và xây dựng mối quan hệ gắn kết giữa các phòng ban. Các trận đấu hứa hẹn sẽ đem đến những khoảnh khắc gay cấn và hấp dẫn.`,
  //   time: "26/10/2024 đến 09/11/2024",
  //   location: "Sân bóng đá mini công ty ABC, Khuôn viên thể thao, 123 Đường ABC, Quận 3, TP. Hồ Chí Minh",
  //   participants: "Tất cả nhân viên chính thức, thực tập sinh và cộng tác viên hiện đang làm việc tại công ty ABC",
  //   rules: "Mỗi đội phải có ít nhất 7 thành viên, bao gồm 1 thủ môn và 6 cầu thủ. /Số lượng thành viên tối đa cho mỗi đội là 10 người (bao gồm cầu thủ dự bị)./Hình thức: Đá sân mini (5 người), mỗi trận kéo dài 2 hiệp, mỗi hiệp 20 phút, nghỉ giữa hiệp 5 phút. /Vòng bảng: Các đội sẽ chia bảng và thi đấu vòng tròn tính điểm./ Vòng knock-out: Áp dụng cho các đội vào vòng bán kết và chung kết. /Trong trường hợp hòa ở vòng knock-out, trận đấu sẽ được quyết định bằng loạt sút luân lưu.",
  //   prizes: "Giải Nhất: Cúp vô địch, huy chương vàng cho các thành viên đội thắng cuộc, và tiền thưởng trị giá 5.000.000 VNĐ. /Giải Nhì: Huy chương bạc và tiền thưởng trị giá 3.000.000 VNĐ. /Giải Ba: Huy chương đồng và tiền thưởng trị giá 2.000.000 VNĐ. /Giải Khuyến Khích: Quà tặng lưu niệm cho tất cả các đội tham gia.",
  //   criterias: "Tinh thần đồng đội/ Kỹ năng chơi bóng/ Tính kỷ luật/ Tinh thần fair play",
  //   lastUpdated: "20/10/2024"
  // };


  // const rulesArray = sampleActivityDetail.rules.split('/').map(rule => rule.trim());
  // const prizesArray = sampleActivityDetail.prizes.split('/').map(prize => prize.trim());
  // const criteriaArray = sampleActivityDetail.criterias.split('/').map(criteria => criteria.trim());

  // sampleActivityDetail.rules = rulesArray;
  // sampleActivityDetail.prizes = prizesArray;
  // sampleActivityDetail.criterias = criteriaArray;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, getToken } = useAuthContext()

  const [images, setImages] = useState([]);

  const fetchImages = async (urls) => {
    const host = process.env.REACT_APP_API_URL;
    try {
      const imagePromises = urls.map(url => fetchImage(host + url));
      const fetchedImages = await Promise.all(imagePromises);
      setImages(fetchedImages.filter(image => image !== null));
    } catch (error) {
      console.log('Error fetching images:', error);
    }
  }

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    const fetchData = async () => {
      try {
        const response = await getActivityById(token, id)
        if (response.data) {
          console.log(response.data);
          setActivityDetail(response.data);
          setLoading(false);
          if (response.data.images.length > 0) fetchImages(response.data.images);
        }
      }
      catch (e) {
        console.log(e);
        setLoading(false);
        setError(e);
      }
    }

    fetchData();

  }, [id, getToken]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user || !id) return;

    const data = {
      empid: user.empid,
      activityid: id,
    };

    const formData = new FormData();
    formData.append("activityApproval", new Blob([JSON.stringify(data)], { type: "application/json" }));

    try {
      const token = getToken();
      const response = await sendActivityApprovalRequest(token, formData);

      if (response.status === 409) {
        console.error("Conflict error:", response.data);
        toast.error("Hoạt động đã tồn tại");
        return;
      }

      console.log(response);
      console.log("Form data submitted:", formData);
      toast.success("Đăng ký thành công");
    }
    catch (e) {
      toast.error("Đăng ký thất bại");
    }
    setRegisterForm(false);
  };

  if (error) {
    return <ErrorPage />
  }

  if (loading) {
    // return <p>Loading activity details...</p>;
    return <LoadingScreen />
  }

  return (
    <div className='bg-white overflow-y-auto rounded-lg w-full h-full py-4 px-6 font-inter flex flex-col gap-4'>
      {/* Header */}
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-center'>
          <h1 className='font-semibold text-2xl'>
            Quản lý hoạt động <span><BsLightningChargeFill className='text-yellow-500 inline' /></span>
          </h1>
          <span className='text-sm text-gray-medium'>
            Cập nhật lần cuối: {formatDate(activityDetail.lastupdate)}
          </span>
        </div>
        {/* Activity List */}
        <Link to={`/${role}/activity`} className='flex flex-row items-center gap-2 text-gray-medium 
        font-semibold hover:underline text-sm'>
          <p>Danh sách hoạt động</p>
          <FaArrowRight />
        </Link>
      </div>
      {/* Divider */}
      <div className='flex'>
        <span className='w-full h-[1.2px] bg-gray-300'></span>
      </div>
      {/* Activity Detail */}
      <div className='w-full flex flex-col gap-2 mt-4'>
        <h1 className='font-inter text-[1.75rem] font-semibold'>
          {activityDetail.name}
        </h1>
        <div className='flex flex-row items-center justify-end text-gray-medium'>
          <button
            className='flex flex-row items-center gap-2 bg-blue-medium text-white px-4 
          py-2 rounded-lg hover:bg-blue-600 transition-colors'
            onClick={() => setRegisterForm(!registerForm)}>
            <span>Đăng ký </span>
            <FaUserPlus />
          </button>
        </div>
        <div className="flex justify-center items-center h-[500px]">
          <ImageCarousel images={images} alt='img-activity' className='rounded-lg object-cover max-h-full max-w-full' />
        </div>
        <div className='font-notoSerif text-lg font-medium text-justify text-[#3B3C4A]'>
          <p>{activityDetail.description}</p>
          <h3 className='font-inter text-black text-xl font-semibold mt-3'>Thời gian diễn ra hoạt động</h3>
          <p>{formatDate(activityDetail.startdate)} tại {activityDetail.location}</p>
          <h3 className='font-inter text-black text-xl font-semibold mt-3'>Đối tượng tham gia</h3>
          <p>{activityDetail.targetparticipants}</p>
          <h3 className='font-inter text-black text-xl font-semibold mt-3'>Luật lệ</h3>
          <ul className='leading-8 list-disc pl-5'>
            {activityDetail.rules.split(/[\/.]/).map((rule, index) => (
              <li key={index}>{rule.trim()}</li>
            ))}
          </ul>
          <h3 className='font-inter text-black text-xl font-semibold mt-3'>Tiêu chí đánh giá</h3>
          <ul className='leading-8 list-disc pl-5'>
            {activityDetail.criteria.split(/[\/.]/).map((criteria, index) => (
              <li key={index}>{criteria}</li>
            ))}
          </ul>
          <h3 className='font-inter text-black text-xl font-semibold mt-3'>Phần thưởng</h3>
          <ul className='leading-8 list-disc pl-5'>
            {activityDetail.reward.split(/[\/.]/).map((prize, index) => (
              <li key={index}>{prize}</li>
            ))}
          </ul>
        </div>
      </div>
      {registerForm && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={handleSubmit}
            className='bg-white px-8 py-8 rounded-lg flex flex-col gap-8 font-poppins'>
            <div>
              <h1 className='font-semibold text-2xl'>Đăng ký tham gia hoạt động</h1>
              <p className='text-gray-medium font-light text-sm'>{activityDetail.title}</p>
            </div>
            <label htmlFor='name' className='flex flex-col items-start gap-2 text-md'>
              Họ và tên
              <input
                type='text'
                name='name'
                id='name'
                value={user.name}
                // onChange={handleInputChange}
                className='border-b-2 w-[400px] outline-none text-lg py-1 pl-2'
                // required
                readOnly
              />
            </label>
            <label className='flex flex-col items-start gap-2 text-md'>
              Phòng ban
              {/* <select
                name='department'
                value={formData.department}
                onChange={handleInputChange}
                className='border-b-2 w-[400px] outline-none text-lg py-1 pl-2'
                required>
                <option value="" disabled hidden>Chọn phòng ban</option>
                {
                  departments.map((department, i) => (
                    // Hoặc value = id
                    <option value={department.name} key={i}>
                      {department.name}
                    </option>
                  ))
                }
              </select> */}
              <input
                type='text'
                name='department'
                id='department'
                value={user.dept.description}
                className='border-b-2 w-[400px] outline-none text-lg py-1 pl-2'
                readOnly
              />
            </label>
            <label htmlFor='phone' className='flex flex-col items-start gap-2 text-md'>
              Số điện thoại
              <input
                type='text'
                name='phone'
                id='phone'
                value={user.phonenum}
                // onChange={handleInputChange}
                className='border-b-2 w-[400px] outline-none text-lg py-1 pl-2'
                // required
                readOnly
              />
            </label>
            <div className='flex flex-row gap-4 justify-end mt-32'>
              <button
                className='bg-gray-400 hover:bg-gray-500 transition-colors px-8 py-1 
                rounded-md text-white'
                onClick={() => setRegisterForm(false)}>
                Hủy
              </button>
              <button
                className='bg-blue-medium hover:bg-blue-600 px-4 py-1 text-white rounded-md'
                type='submit'>
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;
