import React, { useState, useEffect, useRef } from 'react'
import './Todo.css'
import { Calendar } from 'react-calendar'
import styled from 'styled-components'
import 'react-calendar/dist/Calendar.css';
import { RootStateOrAny, useSelector } from "react-redux";


const DateCalendar = styled(Calendar)`
  position: absolute;
  top: 3em;
  left: 0;
  max-width: none;
`;



export function TodoForm(props: any) {

  const initialInput: string = ''

  let dateObj: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
  let startDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  let endDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10)

  const state = useSelector((state: RootStateOrAny) => state.user.user);

  const PriorityLists = ['normal', 'low', 'high']

  const [input, setInput] = useState(initialInput);
  const [description, setDescription] = useState(initialInput);
  const [dateSelect, setDateSelect] = useState<any>(dateObj);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [PriorityText, setPriorityText] = useState('normal');
  const [isOpenPriority, setIsOpenPriority] = useState(false);
  const [updatePriorityText, setUpdatePriorityText] = useState(
    props.edit ? props.edit.priority : ''
  )

  const inputRef: any = useRef(null);
  const inputAreaRef: any = useRef(null);

  // useEffect(() => {
  //   inputRef?.current.focus()
  // })

  // useEffect(() => {
  //   inputAreaRef?.current.focus()
  // })


  const handleChangeDate = (date: any) => {
    console.log(date)
    setDateSelect(date)
  }

  const handleChangeDateInput = (e: any) => {
    // setDateSelect(e.target.value)
  }

  const handleChange = (e: any) => {
    setInput(e.target.value);
  }

  const handleChangeDescription = (e: any) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault(); // loai bo hanh vi mac dinh trinh duyet

    props.onSubmit({
      _idUser: state.user._id,
      title: input,
      description: description,
      date: dateSelect,
      priority: props.edit ? updatePriorityText : PriorityText,
      isCompleted: false
    });
    setInput('');
    setDescription('');
    setPriorityText('normal')
    setDateSelect(dateObj)
  }

  return (
    <div className='todo-form'>
      <form onSubmit={handleSubmit}>
        {!props.edit && (

          <div className='flex flex-col space-y-10'>
            <input type="text"
              placeholder="Add to todo list"
              value={input}
              name="text"
              className="todo-input"
              onChange={handleChange}
              ref={inputRef}
              required
            />

            <textarea className="todo-inputArea"
              value={description}
              onChange={handleChangeDescription}
              name="textarea"
              placeholder="Write something here ..."
              ref={inputAreaRef}
            >
            </textarea>

            <div className="flex w-full justify-around space-x-1">
              <div className="w-1/2">
                <span className="font-thin">Due Date</span>
                <div className="relative top-0 left-0 mt-2">
                  <div className="flex justify-between items-center ">
                    <input onChange={handleChangeDateInput} className="input-date" placeholder={dateObj.toDateString()} value={dateSelect}></input>
                    <div className="box-calendar cursor-pointer" onClick={() => setIsOpenCalendar(!isOpenCalendar)}>
                      <i className="far fa-calendar-alt"></i>
                    </div>
                  </div>
                  {isOpenCalendar && (
                    <DateCalendar
                      value={dateSelect}
                      onChange={handleChangeDate}
                      minDate={startDate}
                      maxDate={endDate}
                    >
                    </DateCalendar>
                  )
                  }
                </div>
              </div>
              <div className="w-1/2">
                <span className="font-thin">Priority</span>
                <div className="relative top-0 left-0 mt-2">
                  <div className="box-priority flex justify-between">
                    <span className="capitalize">{PriorityText}</span>
                    <div className="box-chevrondown" onClick={() => setIsOpenPriority(!isOpenPriority)}>
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>
                  {
                    isOpenPriority && (

                      <div className="div-priority-select">
                        <ul className="space-y-2">
                          {
                            PriorityLists && PriorityLists.map((items, index) => (
                              <li onClick={() => { setPriorityText(items); setIsOpenPriority(!isOpenPriority) }} className={items === PriorityText ? "priority-textlist active" : "priority-textlist"} key={index}>{items}</li>
                            ))
                          }
                        </ul>
                      </div>
                    )
                  }
                </div>
              </div>

            </div>

            <button className="todo-button"> Add todo </button>
          </div>

        )
        }
        {props.edit && (
          <div className='flex flex-col space-y-10'>
            <input type="text"
              placeholder={props.edit.title}
              value={input}
              name="text"
              className="todo-input"
              onChange={handleChange}
              ref={inputRef}
            />

            <textarea className="todo-inputArea"
              value={description}
              onChange={handleChangeDescription}
              name="textarea"
              placeholder={props.edit.description}
              ref={inputAreaRef}
            >
            </textarea>

            <div className="flex w-full justify-around space-x-1">
              <div className="w-1/2">
                <span className="font-thin">Due Date</span>
                <div className="relative top-0 left-0 mt-2">
                  <div className="flex justify-between items-center ">
                    <input onChange={handleChangeDateInput} className="input-date" placeholder={props.edit.date} value={props.edit.date}></input>
                    <div className="box-calendar cursor-pointer" onClick={() => setIsOpenCalendar(!isOpenCalendar)}>
                      <i className="far fa-calendar-alt"></i>
                    </div>
                  </div>
                  {isOpenCalendar && (
                    <DateCalendar
                      value={dateSelect}
                      onChange={handleChangeDate}
                      minDate={startDate}
                      maxDate={endDate}
                    >
                    </DateCalendar>
                  )
                  }
                </div>
              </div>
              <div className="w-1/2">
                <span className="font-thin">Priority</span>
                <div className="relative top-0 left-0 mt-2">
                  <div className="box-priority flex justify-between">
                    <span className="capitalize">{updatePriorityText}</span>
                    <div className="box-chevrondown" onClick={() => setIsOpenPriority(!isOpenPriority)}>
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>
                  {
                    isOpenPriority && (

                      <div className="div-priority-select">
                        <ul className="space-y-2">
                          {
                            PriorityLists && PriorityLists.map((items, index) => (
                              <li onClick={() => { setUpdatePriorityText(items); setIsOpenPriority(!isOpenPriority) }} className={items === updatePriorityText ? "priority-textlist active" : "priority-textlist"} key={index}>{items}</li>
                            ))
                          }
                        </ul>
                      </div>
                    )
                  }
                </div>
              </div>

            </div>

            <button className="todo-button" disabled={props.edit.isCompleted}> Update todo </button>
          </div>
        )
        }
      </form >
    </div >
  );

}

