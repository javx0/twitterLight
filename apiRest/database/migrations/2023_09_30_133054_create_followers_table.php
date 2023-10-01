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
        Schema::create('followers', function (Blueprint $table) {
            $table->unsignedBigInteger("id_user_followed");
            $table->unsignedBigInteger("id_user_following");
            $table->timestamps();
            
            $table->primary("id_user_followed","id_user_following");
            $table->foreign("id_user_followed")->references("id")->on("users");
            $table->foreign("id_user_following")->references("id")->on("users");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('followers');
    }
};
