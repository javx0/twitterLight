<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chat_participants', function (Blueprint $table) {
            $table->unsignedBigInteger("id_user");
            $table->unsignedBigInteger("id_chat");
            $table->timestamps();
            
            $table->primary("id_user","id_chat");
            $table->foreign("id_user")->references("id")->on("users");
            $table->foreign("id_chat")->references("id")->on("chats");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_participants');
    }
};
