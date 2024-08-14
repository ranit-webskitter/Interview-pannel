
import { collection, doc, updateDoc, addDoc, Timestamp, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '@/api/firebaseConfig/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/api/firebaseConfig/firebaseConfig';

interface InterviewData {
  id: string;
  Name: string;
  CV: string;
  HR: string;
  Interview: string;
  Interviewer: string;
  Interview1: string;
  MachineTest: string;
  Interview2: string;
  Status: string;
  comment: string;
}

export const fetchInterviewData = async (): Promise<InterviewData[]> => {
  const snapshot = await getDocs(collection(db, "interview-candidate"))
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,

    ...doc.data(),
  })) as InterviewData[];

 
 
};


export const updateInterviewData = async ({ id, field, value }: { id: string; field: string; value: any | Date }) => {
  const docRef = doc(db, "interview-candidate", id);
  await updateDoc(docRef, {
    [field]: field === "Interview" ? Timestamp.fromDate(new Date(value)) : value,
  });
};

export const addInterviewData = async ({ data, selectedFile }: { data: Omit<InterviewData, 'id'>; selectedFile: File | null }) => {
  let cvURL = "";

  if (selectedFile) {
    const storageRef = ref(storage, `cv/${selectedFile.name}`);
    await uploadBytes(storageRef, selectedFile);
    cvURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "interview-candidate"), {
    ...data,
    Interview: Timestamp.fromDate(new Date(data.Interview)),
    CV: cvURL,
  });
};


export const updateInterviewEventData = async ({ id, title, interviewDate }: { id: string; title: string; interviewDate: Date }) => {
  console.log('interviewDate',interviewDate)
  const docRef = doc(db, "interview-candidate", id);

  await updateDoc(docRef, {
    Name: title,
    Interview: Timestamp.fromDate(interviewDate),
  });
};


export const deleteInterviewEvent=async(id:string)=>{
console.log(id)
  const res=await deleteDoc(doc(db, 'interview-candidate', id))
  // return res
}




  