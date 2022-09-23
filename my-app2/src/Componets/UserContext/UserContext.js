import React from "react";
export const UserContext = React.createContext();

// localstorage:
// - luu tru data tren web
// - qua tragn khac hoac reload thi moi goi ra su dung dc
// - chi delete khi minh viet ham xoa hoac xoa tay
// + set vao
// + get ra

// context: 
// - luu tru data trong context cua reactjs(de cac component len day lay ve)
// - k can load trang(tu dong bo), chi luu vao la lay ra dc luon
// - reload thi bien mat (nen muon giu lai => local..)
// - set vao
// - get ra.
// - boc all cac component vao day de lay ra dung (boc all cac component)

// ben trong context(app)


// redux tuong tu context

// redux: luu trong store: ben trong store(app)
// so do hoat dong:
// get ra:
//  + gia su trong store da co san 1 state,
//  + goi ra component de show ra man hinh
//  + ben component e làm 1 hanh dong(action) gi do và luc nay tao ra 1 state moi
//  + action no nhan 2 tham so: action + state, va truyen cai nay vao store thong qua thang
//  dispatcher
//  + dispatcher truyen tiep vao reducer
//  + reducer tinh toan va tra ve 1 state moi


//  componetn A,b c,d
//  let xx= 1 => context