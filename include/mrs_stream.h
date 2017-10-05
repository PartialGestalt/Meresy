/**************************************************************************//**
 * @file mrs_stream.h
 *
 * @brief Define the interface for datastreams in the Meresy universe.
 *
 * @details The stream interface is fairly tightly coupled to 
 * basic file operations.
 * */
#ifndef _MRS_STREAM_H_
#define _MRS_STREAM_H_

#define MRS_RDONLY  0x01
#define MRS_WRONLY  0x02
#define MRS_RDWR    0x03

/* Forward declaration */
struct _mrs_stream_ops_t;

/**
 * @brief Stream object.
 * @details A stream object should generally be considered as
 * opaque to all but the implementation.
 */
typedef void * mrs_stream_t;

/**
 * Data structure defining the operations that can 
 * be done on a stream object.
 */
typedef struct _mrs_stream_ops_t {
    mrs_stream_t (*s_open)(char *source, int mode);
    void (*s_close)(mrs_stream_t stream);
    size_t (*s_read)(mrs_stream_t stream, void *buffer, size_t size);
    size_t (*s_write)(mrs_stream_t stream, void *buffer, size_t size);
    size_t (*s_seek)(mrs_stream_t stream, int seek_mode, size_t seek_target);
} mrs_stream_ops_t;



#endif /* _MRS_STREAM_H_ */

