<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    protected $fillable = [
        "id_user_followed",
        "id_user_following"
    ];
    use HasFactory;
}
