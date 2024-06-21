import React, { useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function category() {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const create = () => {
    const data = {
      title: title,

      description: description,
    };
    apiInstance
      .post("categories", data)
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Successful",
          text: "Category Created !",
          showConfirmButton: false,
          timer: 2000
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Something Wrong!",
          text: "Try again",
          showConfirmButton: false,
          timer: 2000
        });
      });
  };

  return (
    <div className='gap-3 '>
      <div className='rounded-none py-3 text-left'>
        <Link to='/category' className=''>
          <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
        </Link>
      </div>

      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <label className='text-sm font-semibold'>Category Title</label>
          <Input
            type='text'
            variant='bordered'
            placeholder='Enter your category title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <Textarea
            variant='bordered'
            type='text'
            label='Description'
            placeholder='description'
            onChange={(e) => setDescription(e.target.value)}
            labelPlacement='outside'
          />
        </div>
      </div>

      <div className='flex justify-center gap-10 py-4'>
        <Button color='danger'>
          <Link to='/category'>Cancel</Link>
        </Button>
        <Button color='primary' onClick={create}>
          Create
        </Button>
      </div>
    </div>
  );
}
