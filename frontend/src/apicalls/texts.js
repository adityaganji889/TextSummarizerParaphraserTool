// import axios from 'axios';
import axiosInstance from '.';

export const postParaphrasedText = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/textai/paraphrase", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postSummarizedText = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/textai/summarize", payload);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
  
