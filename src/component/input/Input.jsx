// // src/components/input/input.jsx
// import React, { useState } from "react";
// import styles from "./Inputs.module.scss";

// /**
//  * props
//  * - values: { id, password, passwordConfirm, bio }
//  * - errors: { id, password, passwordConfirm, bio }
//  * - onChange: (field: 'id'|'password'|'passwordConfirm'|'bio', value: string) => void
//  * - labels?: 레이블 커스터마이징 (선택)
//  * - required?: { id?: boolean, password?: boolean, passwordConfirm?: boolean, bio?: boolean }
//  * - maxLengthBio?: number (기본 300)
//  */
// export default function Input({
//   values = { id: "", password: "", passwordConfirm: "", bio: "" },
//   errors = {},
//   onChange,
//   labels = {
//     id: "아이디",
//     password: "비밀번호",
//     passwordConfirm: "비밀번호 확인",
//     bio: "소개글",
//   },
//   required = { id: true, password: true, passwordConfirm: true, bio: false },
//   maxLengthBio = 300,
// }) {
//   const [showPw, setShowPw] = useState(false);
//   const [showPw2, setShowPw2] = useState(false);

//   const handle = (field) => (e) => onChange?.(field, e.target.value);

//   return (
//     <div className={styles.group}>
//       {/* 아이디 */}
//       <div className={styles.field}>
//         <label htmlFor="auth-id" className={styles.label}>
//           {labels.id}
//           {required.id && <span className={styles.req}>*</span>}
//         </label>
//         <input
//           id="auth-id"
//           type="text"
//           className={`${styles.input} ${errors.id ? styles.invalid : ""}`}
//           placeholder="아이디를 입력하세요"
//           value={values.id}
//           onChange={handle("id")}
//           required={!!required.id}
//           autoComplete="username"
//           aria-invalid={!!errors.id}
//           aria-describedby={errors.id ? "auth-id-error" : undefined}
//         />
//         {errors.id && (
//           <p id="auth-id-error" className={styles.error}>
//             {errors.id}
//           </p>
//         )}
//       </div>

//       {/* 비밀번호 */}
//       <div className={styles.field}>
//         <label htmlFor="auth-password" className={styles.label}>
//           {labels.password}
//           {required.password && <span className={styles.req}>*</span>}
//         </label>

//         <div
//           className={`${styles.control} ${errors.password ? styles.invalid : ""}`}
//         >
//           <input
//             id="password"
//             type={showPw ? "text" : "password"}
//             className={styles.inputInner}
//             placeholder="비밀번호를 입력하세요"
//             value={values.password}
//             onChange={handle("password")}
//             required={!!required.password}
//             autoComplete="new-password"
//             aria-invalid={!!errors.password}
//             aria-describedby={errors.password ? "password-error" : undefined}
//           />
//           <button
//             type="button"
//             className={styles.toggle}
//             onClick={() => setShowPw((s) => !s)}
//             aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
//           >
//             {showPw ? "숨김" : "보기"}
//           </button>
//         </div>

//         {errors.password && (
//           <p id="password-error" className={styles.error}>
//             {errors.password}
//           </p>
//         )}
//       </div>

//       {/* 비밀번호 확인 */}
//       <div className={styles.field}>
//         <label htmlFor="password2" className={styles.label}>
//           {labels.passwordConfirm}
//           {required.passwordConfirm && <span className={styles.req}>*</span>}
//         </label>

//         <div
//           className={`${styles.control} ${errors.passwordConfirm ? styles.invalid : ""}`}
//         >
//           <input
//             id="password2"
//             type={showPw2 ? "text" : "password"}
//             className={styles.inputInner}
//             placeholder="비밀번호를 다시 입력하세요"
//             value={values.passwordConfirm}
//             onChange={handle("passwordConfirm")}
//             required={!!required.passwordConfirm}
//             autoComplete="new-password"
//             aria-invalid={!!errors.passwordConfirm}
//             aria-describedby={
//               errors.passwordConfirm ? "password2-error" : undefined
//             }
//           />
//           <button
//             type="button"
//             className={styles.toggle}
//             onClick={() => setShowPw2((s) => !s)}
//             aria-label={showPw2 ? "비밀번호 숨기기" : "비밀번호 보기"}
//           >
//             {showPw2 ? "숨김" : "보기"}
//           </button>
//         </div>

//         {errors.passwordConfirm && (
//           <p id="password2-error" className={styles.error}>
//             {errors.passwordConfirm}
//           </p>
//         )}
//       </div>

//       {/* 소개글 */}
//       <div className={styles.field}>
//         <label htmlFor="bio" className={styles.label}>
//           {labels.bio}
//           {required.bio && <span className={styles.req}>*</span>}
//         </label>

//         <textarea
//           id="bio"
//           className={`${styles.textarea} ${errors.bio ? styles.invalid : ""}`}
//           placeholder="자기소개를 입력하세요"
//           value={values.bio}
//           onChange={handle("bio")}
//           required={!!required.bio}
//           maxLength={maxLengthBio}
//           rows={4}
//           aria-invalid={!!errors.bio}
//           aria-describedby={errors.bio ? "bio-error" : undefined}
//         />
//         <div className={styles.footer}>
//           {errors.bio && (
//             <p id="bio-error" className={styles.error}>
//               {errors.bio}
//             </p>
//           )}
//           <span className={styles.counter}>
//             {(values.bio || "").length}/{maxLengthBio}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import styles from "./input.module.scss"; // 네가 올린 SCSS 파일

export default function Input({
  id,
  label,
  as = "input", // "input" | "textarea"
  value,
  onChange,
  placeholder,
  ...rest
}) {
  const Field = as === "textarea" ? "textarea" : "input";

  return (
    <div className={styles.form}>
      <label className={styles.label} htmlFor={id}>
        {label}
        <Field
          id={id}
          className={as === "textarea" ? styles.textarea : styles.input}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
        />
      </label>
    </div>
  );
}
