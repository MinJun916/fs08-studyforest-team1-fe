import React, { useState } from "react";
import Input from "@/components/Input.jsx"; // @ alias 사용

export default function InputPlayground() {
  const [form, setForm] = useState({
    id: "",
    password: "",
    bio: "",
  });

  const handleChange = (name) => (e) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Input Playground</h1>

      <Input
        id="user-id"
        label="아이디"
        value={form.id}
        onChange={handleChange("id")}
        placeholder="아이디를 입력하세요"
      />

      <Input
        id="user-password"
        label="비밀번호"
        type="password"
        value={form.password}
        onChange={handleChange("password")}
        placeholder="비밀번호를 입력하세요"
      />

      <Input
        id="user-bio"
        label="소개"
        as="textarea"
        value={form.bio}
        onChange={handleChange("bio")}
        placeholder="간단히 소개를 작성하세요"
      />
    </div>
  );
}
