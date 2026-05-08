import styles from "../styles/LoginPage.module.css"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
    namesurname: z.string({ required_error: "กรุณากรอกชื่อ-นามสกุล" }).min(1, "คุณยังไม่ได้กรอกชื่อ-นามสกุล"),
    username: z.string().regex(/^[a-zA-Z0-9]+$/, "กรุณากรอก Username").min(3, "ต้องมีความยาว 3-12 ตัวอักษร").max(12, "ต้องมีความยาว 3-12 ตัวอักษร"),
    email: z.string().min(1, "กรุณากรอกอีเมลล์").email("อีเมลล์ไม่ถูกต้องกรุณากรอกอีกครั้ง"),
    password: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
    confirmPassword: z.string(),
    
}).refine ((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "รหัสผ่านไม่ตรงกัน"
});

export default function RegisterPage() {
    const {
        register, 
        handleSubmit,
        formState: { errors},
        } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const onSubmit = async(data) => {
        alert('สมัครสมาชิกสำเร็จ!');
        console.log(data);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Register Page</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formCard}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>ชื่อ - นามสกุล</label>
                    <input {...register("namesurname")} 
                    className={styles.input}
                    />
                    {
                        errors.namesurname && (<span className={styles.errorText}>{errors.namesurname.message}</span>)
                    }
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>ชื่อผู้ใช้ Username</label>
                    <input {...register("username")} 
                    className={styles.input}
                    />
                    {
                        errors.username && (<span className={styles.errorText}>{errors.username.message}</span>)
                    }
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email</label>
                    <input {...register("email")} 
                    className={styles.input}
                    placeholder="example@gmail.com"
                    />
                    {
                        errors.email && (<span className={styles.errorText}>{errors.email.message}</span>)
                    }
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Password</label>
                    <input {...register("password")} 
                    className={styles.input}
                    type="password" placeholder="********"/>
                    {
                        errors.password && (<span className={styles.errorText}>{errors.password.message}</span>)
                    }
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Confirm Password</label>
                    <input {...register("confirmPassword")} 
                    className={styles.input}
                    type="password" placeholder="********"/>
                    {
                        errors.confirmPassword && (<span className={styles.errorText}>{errors.confirmPassword.message}</span>)
                    }
                </div>

                <button className={styles.submitButton}>Submit</button>
            </form>
        </div>
    )
}