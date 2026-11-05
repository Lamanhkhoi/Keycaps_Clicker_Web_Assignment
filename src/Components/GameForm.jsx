import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'

const GENRES = ['Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Casual']

// PHẦN 1: giá trị ban đầu cho form THÊM mới — mỗi key = name của một ô
const emptyGame = {
  name: '',
  genre: 'Action',
  price: 0,
  discount: 0,
  image: '',
  description: '',
  developer: '',
  releaseDate: '',
  featured: false,
}

// PHẦN 2: luật Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Vui lòng nhập tên game'),
  price: Yup.number()
    .typeError('Giá phải là số')
    .required('Vui lòng nhập giá')
    .min(0, 'Giá không được âm'),
  discount: Yup.number()
    .typeError('Giảm giá phải là số')
    .required('Vui lòng nhập % giảm giá')
    .min(0, 'Giảm giá từ 0 đến 100')
    .max(100, 'Giảm giá từ 0 đến 100'),
  image: Yup.string()
    .required('Vui lòng nhập link ảnh')
    .url('Link ảnh không hợp lệ (http://...)'),
  description: Yup.string()
    .required('Vui lòng nhập mô tả')
    .min(10, 'Mô tả tối thiểu 10 ký tự'),
  developer: Yup.string()
    .required('Vui lòng nhập nhà phát triển'),
  releaseDate: Yup.string()
    .required('Vui lòng nhập ngày phát hành (ví dụ 2022-02-24)'),
})

// Form thêm/sửa game cho trang Admin.
// Props:
//   initialValues = game cần sửa (không truyền thì dùng emptyGame -> form THÊM)
//   onSubmit      = hàm của AdminPage, nhận values khi form hợp lệ
//   submitLabel   = chữ trên nút
export default function GameForm({ initialValues = emptyGame, onSubmit, submitLabel = 'Lưu' }) {
  // PHẦN 3: khởi tạo Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true, // initialValues đổi (sửa game khác) -> form nạp lại giá trị mới
  })

  // PHẦN 4: giao diện
  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Tên game</label>
        <input
          type="text"
          id="name"
          name="name"
          className={formik.touched.name && formik.errors.name ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-danger small">{formik.errors.name}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="genre" className="form-label">Thể loại</label>
        <select
          id="genre"
          name="genre"
          className="form-select"
          value={formik.values.genre}
          onChange={formik.handleChange}
        >
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">Giá gốc (USD)</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          step="0.01"
          className={formik.touched.price && formik.errors.price ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.price && formik.errors.price && (
          <div className="text-danger small">{formik.errors.price}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="discount" className="form-label">Giảm giá (%)</label>
        <input
          type="number"
          id="discount"
          name="discount"
          min="0"
          max="100"
          className={formik.touched.discount && formik.errors.discount ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.discount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.discount && formik.errors.discount && (
          <div className="text-danger small">{formik.errors.discount}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">Link ảnh</label>
        <input
          type="text"
          id="image"
          name="image"
          className={formik.touched.image && formik.errors.image ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.image && formik.errors.image && (
          <div className="text-danger small">{formik.errors.image}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Mô tả</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className={formik.touched.description && formik.errors.description ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-danger small">{formik.errors.description}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="developer" className="form-label">Nhà phát triển</label>
        <input
          type="text"
          id="developer"
          name="developer"
          className={formik.touched.developer && formik.errors.developer ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.developer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.developer && formik.errors.developer && (
          <div className="text-danger small">{formik.errors.developer}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="releaseDate" className="form-label">Ngày phát hành (YYYY-MM-DD)</label>
        <input
          type="text"
          id="releaseDate"
          name="releaseDate"
          className={formik.touched.releaseDate && formik.errors.releaseDate ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.releaseDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.releaseDate && formik.errors.releaseDate && (
          <div className="text-danger small">{formik.errors.releaseDate}</div>
        )}
      </div>

      <div className="mb-3">
        <div className="form-check">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            className="form-check-input"
            checked={formik.values.featured}
            onChange={formik.handleChange}
          />
          <label htmlFor="featured" className="form-check-label">Hiển thị ở mục nổi bật ở trang chủ</label>
        </div>
      </div>

      <Button type="submit" variant="success" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Đang lưu...' : submitLabel}
      </Button>
    </form>
  )
}
