<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat_participants extends Model
{
    protected $fillable = [
        "id_user",
        "id_chat"
    ];

    use HasFactory;
}
