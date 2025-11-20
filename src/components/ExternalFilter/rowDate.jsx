import React from 'react'

export default function  asDate(dateAsString) {
    const [day, month, year] = dateAsString.split("/").map(Number);
  
    return new Date(year, month - 1, day);
}
